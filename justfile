project := 'bouncing-lines'
remote-server := 'tilde.team'
remote-user := 'padeso'
remote-dir := '/home/padeso/public_html' / project
base-dir := '/~padeso' / project
build-dir := './dist' / remote-server

# Serve the site locally
dev: 
    pnpm run dev --open

# Build the site
build:
    pnpm build --base="{{ base-dir }}" --outDir="{{ build-dir }}"

# Serve the built site
preview: build
    pnpm preview --base="{{ base-dir }}" --outDir="{{ build-dir }}" --open

# Build and then deploy the site
deploy: build
    # Remove existing files
    ssh {{ remote-user }}@{{ remote-server }} "bash -c 'if [ -d \"{{ remote-dir }}\" ]; then rm -r \"{{ remote-dir }}\"; fi'"
    # Copy new files
    scp -r "{{ build-dir }}" "scp://{{ remote-user }}@{{ remote-server / remote-dir }}"

# Delete the output files
clean:
    rm -r "{{ build-dir }}"