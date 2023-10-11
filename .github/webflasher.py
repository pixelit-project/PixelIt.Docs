import os
import re
from pathlib import Path
from jinja2 import Template
import json

print("+++ Starting webflasher prepare script... +++")

root = Path("src/.vuepress/public/pixelit_flasher/")
meta = Path("src/.vuepress/public/pixelit_flasher/meta.json")

json_template = '''
{
  "name": "PixelIt",
  "version": "{{version}}",
  "home_assistant_domain": "PixelIt",
  "funding_url": "https://github.com/pixelit-project/PixelIt",
  "new_install_prompt_erase": true,
  "builds": [
    {
      "chipFamily": "{{chipFamily}}",
      "parts": [
        {
          "path": "{{path}}",
          "offset": 0
        }
      ]
    }
  ]
}
'''

# Define your regex pattern
pattern = r"firmware_((.*?)(?:-(.*?))?_(.*?)_(.*?)(?:\.(.*))?).bin"

data_list = []

# Loop through the files in the folder
for filename in os.listdir(os.path.join(root, "firmware")):
    # Check if the file is a regular file
    if os.path.isfile(os.path.join(os.path.join(root, "firmware"), filename)):
        # Use regex to extract the different parts of the filename
        match = re.match(pattern, filename)
        if match:
            data = {
                "version": match.group(2),
                "beta": True if match.group(3) == "beta" else False,
                "testing": True if match.group(3) == "testing" else False,
                "chipFamily": match.group(4),
                "enviroment": match.group(5),
                "full-upgrade": True if match.group(6) == "full-upgrade" else False,
                "manifest": f"manifest_{match.group(1)}.json",
                "firmware": filename,
                "path": f"firmware/{filename}"
            }

            # Print the different parts of the filename
            print(f"Found firmware file! Version: {data['version']}, ChipFamily: {data['chipFamily']}, Enviroment: {data['enviroment']}, Full-upgrade: {data['full-upgrade']}, Beta: {data['beta']}, Testing: {data['testing']}...")

            # Create manifest file
            template = Template(json_template)

            # Render the template with the values
            filled_json = template.render(data)

            # Write the manifest file
            print(f"Writing manifest file {data['manifest']}...")
            with open(os.path.join(root, "manifest",data['manifest']), "w") as f:
                f.write(filled_json)

            # Append data to list
            data_list.append(data)


# Write meta file with all manifest information
print(f"Writing meta.json file with {len(data_list)} entires...")
with open(meta, "w") as json_file:
    json_file.write(json.dumps(data_list, indent=2))

print("+++ Webflasher prepare script done! +++")