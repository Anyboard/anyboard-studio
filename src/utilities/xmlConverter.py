with open("workspace.xml", "r") as xml_file:
    lines = xml_file.read().splitlines()
file = open("workspace.txt","w") 

for line in lines:
    file.write("    toolbox += '" + line + "'\n")
 
file.close() 
