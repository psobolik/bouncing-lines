# Setup:
```shell
$ pnpm install
```
# Build:
For local installation, build with `bouncing-lines` base.
```shell
$ pnpm build --base=bouncing-lines --outDir=dist/pop-os
```
For installation on tilde.team, build with `/~padeso/bouncing-lines` base.
```shell
$ pnpm build --base=/~padeso/bouncing-lines --outDir=dist/tilde.team
```
# Deploy:
To install locally, copy the dist folder and its contents to the target folder.
```shell
$ sudo rcp -r ./dist/pop-os /var/www/html/bouncing-lines
```
To update locally, copy the files in the dist folder to the target folder.
```shell
$ sudo rcp -r ./dist/pop-os/* /var/www/html/bouncing-lines
```
To install on tilde.team the first time, copy the dist folder and its contents to the target folder.
```shell
$ rcp -r ./dist/tilde.team tilde.team:~/public_html/bouncing-lines
```
To update the files on tilde.team, copy the files in the dist folder to the target folder.
```shell
$ rcp -r ./dist/tilde.team/* tilde.team:~/public_html/bouncing-lines
```
