with open("../anyboardGameDemo/index.html", "r") as xml_file:
    lines = xml_file.read().splitlines()
file = open("templateHTML.txt","w")

for line in lines:
    line = line.replace("'", "\\'")
    file.write("htmlTemplate += '" + line + "\\n'\n")

file.close()
