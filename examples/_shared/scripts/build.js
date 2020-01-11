/**
 * Script to install and build required framework demo dependencies from app.config.json
 */

const
    path          = require('path'),
    fs            = require('fs'),
    appConfigFile = path.resolve('app.config.json'),
    appConfig     = fs.existsSync(appConfigFile) && JSON.parse(fs.readFileSync(appConfigFile)),
    { spawnSync } = require('child_process'),
    npm           = (folder, options) => {
        spawnSync('npm', options, { cwd : folder, stdio : 'inherit', shell : true });
    },
    colorOk       = '\x1b[32m%s\x1b[0m',
    colorSkip     = '\x1b[33m%s\x1b[0m';

if (appConfig && appConfig.dependencies && appConfig.dependencies.length > 0) {
    appConfig.dependencies.forEach(({ src, out }) => {
        const
            folder      = path.resolve(src),
            outFolder   = out && path.resolve(out),
            packageJson = path.join(folder, 'package.json');

        if (fs.existsSync(packageJson) && outFolder && !fs.existsSync(outFolder)) {
            console.log(colorOk, `Building dependency "${folder}"`);
            npm(folder, ['install']);
            npm(folder, ['rebuild', 'node-sass']);
            npm(folder, ['run', 'build']);
        }
        else {
            console.log(colorSkip, `Skip building dependency "${folder}"`);
        }
    });
}
