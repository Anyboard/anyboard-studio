with open("index.html", "r") as xml_file:
    lines = xml_file.read().splitlines()
file = open("html-template.js","w")

file.write("let htmlTemplate = ''\n")
for line in lines:
    line = line.replace("'", "\\'")
    file.write("htmlTemplate += '" + line + "\\n'\n")
file.write("\n")
file.write("export default htmlTemplate\n")
file.close()
