import * as fs from 'fs';


const filepath = `${process.cwd()}/src/db/db.json`;

export const saveIp = ip => {
    const data = JSON.parse(fs.readFileSync(filepath));
    fs.writeFileSync(filepath, JSON.stringify([...data, ip], null, 2));
}