import argparse
import os
import re
import shutil
import subprocess
import sys
from bs4 import BeautifulSoup
import tempfile
from tqdm import tqdm

PBAR_FORMAT = "{desc}: {percentage:3.0f}%|{bar}| {n_fmt}/{total_fmt} [{elapsed}<{remaining}, {rate_fmt}]"
ALL_ICON_SETS = {
    "Academicons": {
        "url": "https://github.com/jpswalsh/academicons/tree/master/svg"
    },
    "Carbon": {
        "url": "https://github.com/carbon-design-system/carbon/tree/v10/packages/icons/src/svg/32" 
    },
    "Dev": {
        "url": "https://github.com/devicons/devicon/tree/master/icons"
    },
    "EntypoPlus": {
        "url": '''https://github.com/chancancode/entypo-plus/tree/master/source/Entypo%2B'''
    },
    "EntypoSocial": {
        "url": '''https://github.com/chancancode/entypo-plus/tree/master/source/Entypo%2B%20Social%20Extension'''
    },
    "Flag": {
        "url": "https://github.com/lipis/flag-icons/tree/main/flags/4x3"
    },
    "FontAudio": {
        "url": "https://github.com/fefanto/fontaudio/tree/master/svgs"
    },
    "FontAwesomeRegular": {
        "url": "https://github.com/FortAwesome/Font-Awesome/tree/6.x/svgs/regular" 
    },
    "FontGIS": {
        "url": "https://github.com/Viglino/font-gis/tree/main/svg"
    },
    "Game": {
        "url": "https://github.com/game-icons/icons"
    },
    "Geoglyphs": {
        "url": "https://github.com/cugos/geoglyphs/tree/main/src"
    },
    "HeroiconsSolid": {
        "url": "https://github.com/tailwindlabs/heroicons/tree/master/src/24/solid"
    },
    "Lucide": {
        "url": "https://github.com/lucide-icons/lucide/tree/main/icons"
    },
    "SVGLogos": {
        "url": "https://github.com/gilbarbara/logos/tree/main/logos"
    },
    "Map": {
        "url": "https://github.com/scottdejonge/map-icons/tree/master/src/icons"
    },
    "Medical": {
        "url": "https://github.com/samcome/webfont-medical-icons/tree/master/packages/svg"
    },
    "MuiLine": {
        "url": "https://github.com/cyberalien/line-md/tree/master/svg"
    },
    "Radix": {
        "url": "https://github.com/radix-ui/icons/tree/master/packages/radix-icons/icons" 
    },
    "Skill": {
        "url": "https://github.com/tandpfun/skill-icons/tree/main/icons"
    },
    "Spinner": {
        "url": "https://github.com/n3r4zzurr0/svg-spinners/tree/main/svg-smil"
    },
    "Tldraw": {
        "url": "https://github.com/tldraw/tldraw/tree/main/assets/icons/icon" 
    },
    "VSCode": {
        "url": "https://github.com/vscode-icons/vscode-icons/tree/master/icons"
    },
    "CSSGG": {
        "url": "https://github.com/astrit/css.gg/tree/master/icons/svg"
    }
}

# Function to convert SVG file name to CamelCase
def to_camel_case(name: str) -> str:
    # remove dupes and sort
    name = name.split('.')[0]
    # remove non-alphanumeric
    name = re.sub(r'[^a-zA-Z0-9]', ' ', name)
    # remove leading/trailing whitespace, capitalize each word
    name = ''.join(word.capitalize() for word in name.split())
    # prefix with underscore if first character is a digit
    if name and name[0].isdigit():
        name = f"_{name}"
    # prefix with underscore if name is a reserved word
    if name in ["Infinity"]:
        name = f"_{name}"
    return name

def filter_content_for_transparent_rectangles(content: str) -> str:
    content = content = content.decode('utf-8')
    # Define the pattern to find IDs with 'Transparent_Rectangle'
    pattern = r'id="([^"]*Transparent_Rectangle[^"]*)"'
    found_ids = re.findall(pattern, content)

    for id in found_ids:
        # Define a new pattern to match the <rect> tag with the found ID, including potential newline characters
        rect_pattern = rf'(\n|\r\n)?<rect id="{re.escape(id)}[^"]*"[^/>]*/>(\n|\r\n)?'
        content = re.sub(rect_pattern, '', content)

    content = content.encode('utf-8')
    return content

def rename_svg(svg: str):
    new_name = to_camel_case(os.path.basename(svg))
    # Avoid names that now become duplicate due to camel case conversion
    if new_name.lower() == 'login':
        capitalized = sum(1 for c in new_name if c.isupper())
        if capitalized >= 2:
            new_name = 'LogInIcon'
    if new_name.lower() == 'logout':
        capitalized = sum(1 for c in new_name if c.isupper())
        if capitalized >= 2:
            new_name = 'LogoutIcon'
    if new_name.lower() == 'jetpack':
        capitalized = sum(1 for c in new_name if c.isupper())
        if capitalized >= 2:
            new_name = 'JetPackIcon'
    if new_name.lower() == 'headshot':
        capitalized = sum(1 for c in new_name if c.isupper())
        if capitalized >= 2:
            new_name = 'HeadShotIcon'
    return new_name

# Function to generate iconset file
def generate_iconset_file(new_svgs: list, iconset_name: str, directory: str, repo: str = "", clean: bool = True) -> None:
    # Where to generate the ts file at
    outfile_path = f"../components/Icons/IconSets/{iconset_name}.tsx"
    # Optionally overwrite existing file
    if clean and os.path.exists(outfile_path):
        os.remove(outfile_path)
    new_svgs = sorted(list(set(new_svgs)))
    with open(outfile_path, 'w') as outfile:
        outfile.write(f"\'use client\'\n")
        outfile.write(f"import dynamic from 'next/dynamic';\n\n")
        # outfile.write(f"const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '@/{directory.replace('../', '').split('/')[0]}';\n")
        # outfile.write(f"const prefix = assetPrefix + '/icons/{iconset_name}';\n\n")
        
        # import each svg
        for new_name in new_svgs:
            outfile.write(f"const {new_name} = dynamic(() => import('@/{directory.replace('../', '').split('/')[0]}/icons/{iconset_name}/{new_name}.svg'));\n")
            # outfile.write(f"const {new_name} = dynamic(() => import(prefix + '/{new_name}.svg'));\n")
            # outfile.write(f"const {new_name} = dynamic(() => import(`${{prefix}}/{new_name}.svg`));\n")
        # import IconSet type
        outfile.write(f"\nimport {{ IconSet }} from '@/components';\n")
        icons_str = ', '.join(new_svgs)
        # export map of icon names to svg components
        outfile.write(f"export const {iconset_name}IconSet: IconSet = {{\n  {icons_str}\n}};\n")
        outfile.write(f"export const {iconset_name}IconNames = Object.keys({iconset_name}IconSet);\n")
        outfile.write(f"export type {iconset_name}Icon = keyof typeof {iconset_name}IconSet;\n")
        # comment with source url
        outfile.write(f"// {iconset_name} - https://github.com/{repo} - {len(new_svgs)} Icons\n")

def download_svg(svg: str, iconset_name: str, directory: str, repo_path: str = "", pbar=None):
    svg_url = os.path.join(repo_path, svg)
    content = open(svg_url, 'rb').read()
    content = filter_content_for_transparent_rectangles(content)
    if b'<svg' in content:
      new_name = rename_svg(svg)
      svg_filename = os.path.join(f"{directory}", new_name + '.svg')
      with open(svg_filename, 'wb') as file:
        file.write(content)
      if pbar:
        pbar.set_description(f"Downloading {svg}")
        pbar.update(1)
        pbar.refresh()
      return new_name

# Function to download SVGs from GitHub using git
def download_from_github(repo: str, path: str, iconset_name: str, directory: str, max_depth: int, clean: bool = True, position: int = 1) -> None:
    with tempfile.TemporaryDirectory() as tmp_dir:
        subprocess.run(["git", "clone", f"https://github.com/{repo}.git", tmp_dir], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        actual_path = os.path.join(tmp_dir, '/'.join(path.split('/')[2:]))
        all_svgs = [os.path.join(dp, f) for dp, dn, filenames in os.walk(actual_path) for f in filenames if f.endswith('.svg')]
        all_svgs = sorted(list(set(all_svgs)))
        with tqdm(total=len(all_svgs), unit="set", bar_format=PBAR_FORMAT, leave=False, position=position, file=sys.stdout) as pbar:
            new_svgs = []
            for svg in all_svgs:
                new_name = download_svg(svg, iconset_name, directory, actual_path, pbar)
                new_svgs.append(new_name)
            pbar.set_description(f"Generating {iconset_name} iconset file")
            generate_iconset_file(new_svgs, iconset_name, directory, repo, clean)
            pbar.set_description(f"Finished {iconset_name} iconset")

def download_svgs(url, iconset_name, directory, max_depth, clean, position):
    if 'github.com' in url:
        parts = url.split('/')
        repo = '/'.join(parts[3:5])
        path = '/'.join(parts[5:])
        download_from_github(repo, path, iconset_name, directory, max_depth, clean, position)

def download_iconsets(iconsets, max_depth, clean):  
    # Overall progress bar
    total_iconsets = len(iconsets)
    position = 0
    with tqdm(total=total_iconsets, unit="iconset", leave=True, ncols=50, position=position, file=sys.stdout) as overall_pbar:
        for iconset_name in iconsets:
            if iconset_name in ALL_ICON_SETS:
              overall_pbar.set_description(f"Downloading {iconset_name}")
              directory = f"../assets/icons/{iconset_name}"
              if clean and os.path.exists(directory):
                  shutil.rmtree(directory, ignore_errors=True)
              if not os.path.exists(directory):
                os.makedirs(directory)
              download_svgs(ALL_ICON_SETS[iconset_name]["url"], iconset_name, directory, max_depth, clean, position)
              position += 1
              overall_pbar.update(1)
              overall_pbar.refresh()

# Main function
def main() -> None:
    parser = argparse.ArgumentParser(description="Download SVG files from a CDN or GitHub repository")
    parser.add_argument('--iconsets', nargs='+', default=['Tldraw'], help='List of icon sets')
    parser.add_argument('--max_depth', type=int, default=2, help="Maximum depth for GitHub repository search")
    parser.add_argument('--clean', action='store_true', help="Clean existing resources")
    args = parser.parse_args()

    download_iconsets(args.iconsets, args.max_depth, args.clean)

if __name__ == "__main__":
    main()
