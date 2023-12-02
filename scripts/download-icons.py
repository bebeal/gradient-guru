import argparse
import os
import re
import shutil
import subprocess
import requests
from bs4 import BeautifulSoup
import tempfile
from tqdm import tqdm

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

# Function to generate iconset file
def generate_iconset_file(new_svgs: list, directory: str, url: str = "", clean: bool = True) -> None:
    # Where to generate the ts file at
    outfile_path = f"../components/Icons/IconSets/{os.path.basename(directory)}.tsx"
    icon_set_name = directory.split('/')[-1]
    # Optionally overwrite existing file
    if clean and os.path.exists(outfile_path):
        os.remove(outfile_path)
    new_svgs = sorted(list(set(new_svgs)))
    with open(outfile_path, 'w') as outfile:
        # outfile.write("\'use client\'\n\n")
        # import each svg
        for new_name in new_svgs:
            outfile.write(f"import {new_name} from '@/{directory.replace('../', '')}/{new_name}.svg';\n")
        # import IconSet type
        outfile.write(f"import {{ IconSet }} from '@/components';\n")
        icons_str = ', '.join(new_svgs)
        # export map of icon names to svg components
        outfile.write(f"export const {icon_set_name}IconSet: IconSet = {{\n  {icons_str}\n}};\n")
        outfile.write(f"export const {icon_set_name}IconNames = Object.keys({icon_set_name}IconSet);\n")
        outfile.write(f"export type {icon_set_name}Icon = keyof typeof {icon_set_name}IconSet;\n")
        # comment with source url
        outfile.write(f"// {icon_set_name} - https://github.com/{str(url)} - {len(new_svgs)} Icons\n")

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

# Function to handle tqdm progress bar
def handle_progress_bar(svgs: list, directory: str, source_url: str="", from_git: bool = False, repo_path: str = "", position = 1) -> None:
    # Remove dupes and sort
    svgs = sorted(list(set(svgs)))
    pbar_format = "{desc}: {percentage:3.0f}%|{bar}| {n_fmt}/{total_fmt} [{elapsed}<{remaining}, {rate_fmt}]"
    with tqdm(total=len(svgs), unit="set", bar_format=pbar_format, leave=False, position=position) as pbar:
        new_svgs = []
        for svg in svgs:
            svg_url = f"{source_url}{svg}" if not from_git else os.path.join(repo_path, svg)
            content = requests.get(svg_url).content if not from_git else open(svg_url, 'rb').read()
            content = filter_content_for_transparent_rectangles(content)

            if b'<svg' in content:
                new_name = to_camel_case(svg if not from_git else os.path.basename(svg))
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
                new_svgs.append(new_name)
                svg_filename = os.path.join(directory, new_name + '.svg')
                with open(svg_filename, 'wb') as file:
                    file.write(content)
            pbar.set_description(f"Downloading {svg}")
            pbar.update(1)
        pbar.set_description(f"Generating {directory} iconset file")
        generate_iconset_file(new_svgs, directory, source_url, clean=True)
        icon_set_name = directory.split('/')[-1]
        pbar.set_description(f"Finished {icon_set_name} iconset")
    # Print the final state of each icon set's progress bar
    print(f"Processing {icon_set_name}: 100%|{'█'*50}| {len(svgs)}/{len(svgs)} [{pbar.format_interval(pbar.last_print_t - pbar.start_t)}]")

# Function to download SVGs from GitHub using git
def download_from_github_with_git(repo: str, path: str, directory: str, max_depth: int, clean: bool = True, position: int = 1) -> None:
    with tempfile.TemporaryDirectory() as tmp_dir:
        subprocess.run(["git", "clone", f"https://github.com/{repo}.git", tmp_dir], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        actual_path = os.path.join(tmp_dir, '/'.join(path.split('/')[2:]))
        all_svgs = [os.path.join(dp, f) for dp, dn, filenames in os.walk(actual_path) for f in filenames if f.endswith('.svg')]
        handle_progress_bar(all_svgs, directory, repo, from_git=True, repo_path=actual_path, position=position)

def download_svgs(url, directory, max_depth, clean, position):
    if 'github.com' in url:
        parts = url.split('/')
        repo = '/'.join(parts[3:5])
        path = '/'.join(parts[5:])
        directory = directory.replace(',', '')
        if not os.path.exists(directory):
            os.makedirs(directory)
        download_from_github_with_git(repo, path, directory, max_depth, clean, position)

def download_iconsets(max_depth, clean):
    iconsets = {
        # "Academicons": {
        #     "url": "https://github.com/jpswalsh/academicons/tree/master/svg"
        # },
        "Carbon": {
            "url": "https://github.com/carbon-design-system/carbon/tree/v10/packages/icons/src/svg/32" 
        },
        # "Dev": {
        #     "url": "https://github.com/devicons/devicon/tree/master/icons"
        # },
        # "EntypoPlus": {
        #     "url": '''https://github.com/chancancode/entypo-plus/tree/master/source/Entypo%2B'''
        # },
        # "EntypoSocial": {
        #     "url": '''https://github.com/chancancode/entypo-plus/tree/master/source/Entypo%2B%20Social%20Extension'''
        # },
        # "Flag": {
        #     "url": "https://github.com/lipis/flag-icons/tree/main/flags/4x3"
        # },
        # "FontAudio": {
        #     "url": "https://github.com/fefanto/fontaudio/tree/master/svgs"
        # },
        # "FontAwesomeRegular": {
        #     "url": "https://github.com/FortAwesome/Font-Awesome/tree/6.x/svgs/regular" 
        # },
        # "FontGIS": {
        #     "url": "https://github.com/Viglino/font-gis/tree/main/svg"
        # },
        # "Game": {
        #     "url": "https://github.com/game-icons/icons"
        # },
        # "Geoglyphs": {
        #     "url": "https://github.com/cugos/geoglyphs/tree/main/src"
        # },
        # "HeroiconsSolid": {
        #     "url": "https://github.com/tailwindlabs/heroicons/tree/master/src/24/solid"
        # },
        # "Lucide": {
        #     "url": "https://github.com/lucide-icons/lucide/tree/main/icons"
        # },
        # "Logos": {
        #     "url": "https://github.com/gilbarbara/logos/tree/main/logos"
        # },
        # "Map": {
        #     "url": "https://github.com/scottdejonge/map-icons/tree/master/src/icons"
        # },
        # "Medical": {
        #     "url": "https://github.com/samcome/webfont-medical-icons/tree/master/packages/svg"
        # },
        # "MuiLine": {
        #     "url": "https://github.com/cyberalien/line-md/tree/master/svg"
        # },
        # "Radix": {
        #     "url": "https://github.com/radix-ui/icons/tree/master/packages/radix-icons/icons" 
        # },
        # "Skill": {
        #     "url": "https://github.com/tandpfun/skill-icons/tree/main/icons"
        # },
        # "Spinner": {
        #     "url": "https://github.com/n3r4zzurr0/svg-spinners/tree/main/svg-smil"
        # },
        # "Tldraw": {
        #     "url": "https://github.com/tldraw/tldraw/tree/main/assets/icons/icon" 
        # },
        # "VSCode": {
        #     "url": "https://github.com/vscode-icons/vscode-icons/tree/master/icons"
        # },
    }
    
    # Overall progress bar
    total_iconsets = len(iconsets)
    with tqdm(total=total_iconsets, unit="iconset", leave=True, ncols=300) as overall_pbar:
        position = 1
        for iconset_name in iconsets:
            overall_pbar.set_description(f"Downloading {iconset_name}")
            directory = f"../assets/icons/{iconset_name}"
            if clean and os.path.exists(directory):
                shutil.rmtree(directory, ignore_errors=True)
            download_svgs(iconsets[iconset_name]["url"], directory, max_depth, clean, position)
            position += 1
            overall_pbar.set_description(f"Finished {iconset_name} iconset")
            overall_pbar.update(1)

# Main function
def main() -> None:
    parser = argparse.ArgumentParser(description="Download SVG files from a CDN or GitHub repository")
    parser.add_argument('--max_depth', type=int, default=2, help="Maximum depth for GitHub repository search")
    parser.add_argument('--clean', action='store_true', help="Clean existing resources")
    args = parser.parse_args()

    download_iconsets(args.max_depth, args.clean)

if __name__ == "__main__":
    main()