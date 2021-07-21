# Cache Busting
version=`date +%s`

sed -i "" "s/\/\(index.js\)\"/\/\1?ver=$version\"/" build/index.html
sed -i "" "s/\/\(index.css\)\"/\/\1?ver=$version\"/" build/index.html
sed -i "" "s/@@@@@/$version/" build/service-worker.js

# Versioning
/bin/echo -n $version>public/version.txt
/bin/echo -n $version>build/version.txt
