import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const USERNAME = 'tavoidkk';
const OUTPUT_DIR = join(__dirname, '..', 'src', 'data');
const OUTPUT = join(OUTPUT_DIR, 'github.json');

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('Missing GITHUB_TOKEN environment variable');
  process.exit(1);
}

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'portfolio-refresh',
  },
  body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
});

if (!res.ok) {
  console.error(`GraphQL request failed: ${res.status}`);
  process.exit(1);
}

const json = await res.json();
if (json.errors) {
  console.error('GraphQL errors:', JSON.stringify(json.errors));
  process.exit(1);
}

const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
if (!cal?.weeks) {
  console.error('Unexpected GraphQL response shape');
  process.exit(1);
}

const days = cal.weeks.flatMap((w) =>
  w.contributionDays.map((d) => ({
    date: d.date,
    count: d.contributionCount,
    level: LEVEL_MAP[d.contributionLevel] ?? 0,
  }))
);

const output = {
  username: USERNAME,
  total: cal.totalContributions,
  generatedAt: new Date().toISOString(),
  days,
};

await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(OUTPUT, JSON.stringify(output, null, 2) + '\n');
console.log(`${days.length} days · ${cal.totalContributions} contributions · wrote ${OUTPUT}`);