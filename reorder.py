"""Reordering of sounds.json based on livre/episode data.

usage:
    python reorder.py <sounds.json pathname>

This script do not modify given file in-place,
but create the reordered one next to it, with .reordered suffix

"""

import os
import re
import sys
import json

REGEX_INFO = re.compile(r'Livre ([IV]+), ([0-9]+) - (.*)')
LIVRE_NUMBER = {'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7}

def rank(citation:dict) -> int:
    match = REGEX_INFO.fullmatch(citation['episode'])
    assert match, citation['episode']
    livre, episode, _ = match.groups(0)
    return LIVRE_NUMBER[livre], int(episode)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(__doc__)
        exit(1)
    with open(sys.argv[1]) as fd:
        data = json.load(fd)
    data.sort(key=rank)
    # data = ''.join(' '*4 + line for line in .splitlines(True)) + '\n'
    data = json.dumps(data, indent=' '*4, ensure_ascii=False)
    with open(sys.argv[1] + '.reordered', 'w') as fd:
        fd.write(data)
