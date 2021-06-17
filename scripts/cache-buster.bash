# Cache Busting
md5js=`md5sum build/index.js | awk '{ print $1 }'`
md5css=`md5sum build/index.css | awk '{ print $1 }'`

sed -i -e "s/\/\(index.js\)\"/\/\1?ver=$md5js\"/" build/index.html
sed -i -e "s/\/\(index.css\)\"/\/\1?ver=$md5css\"/" build/index.html

# Versioning
echo -n $md5js$md5js>public/version.txt
echo -n $md5js$md5js>build/version.txt
