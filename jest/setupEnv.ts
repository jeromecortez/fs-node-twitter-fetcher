import fs from 'fs';
import path from 'path';
const envFileItems = fs.readFileSync(path.resolve(__dirname, '../.env.development'), { encoding: 'utf-8' }).toString().split('\n');
for (const env of envFileItems) {
    const envKey = env.split('=')[0];
    const envValue = env.split('=')[1];
    process.env =  { ...process.env, [envKey]: envValue }
}