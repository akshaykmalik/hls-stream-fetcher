import fs from 'fs';
import path from 'path';

function clearDirectory(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(dirPath, file), err => {
                if (err) throw err;
            });
        }
    });
}

export {clearDirectory};