#!/bin/bash

TEMP_FILE=temp.mp3
PADDED_FILE=paddedNormalized.temp.mp3

# Check than ffmpeg && ffmpeg-normalize is installed
if ! [ -x "$(command -v ffmpeg)" ]; then
  echo 'Error: ffmpeg is not installed.' >&2
  exit 1
fi
if ! [ -x "$(command -v ffmpeg-normalize)" ]; then
  echo 'Error: ffmpeg-normalize is not installed.' >&2
  exit 1
fi

# Check that input mp3 is present & exist
if [ -n "$1" ]
then
  inputFile=$1
else
  echo 'Error: missing input file' >&2
  exit 1
fi
if [ ! -f ./$inputFile ]; then
    echo "File not found!"
fi

cleanup () {
  rm -f $TEMP_FILE
  rm -f $PADDED_FILE
  rm -f final.mp3
}

cleanup

# Normalize the file
# Due to an issue with ffmpeg-normalize, file shorter than 3s cannot be normalized
# The following use a solution from https://github.com/slhck/ffmpeg-normalize/issues/87#issuecomment-488944192
ffmpeg -i $inputFile -af "adelay=10000|10000" $TEMP_FILE

ffmpeg-normalize $TEMP_FILE -o $PADDED_FILE -c:a libmp3lame

ffmpeg -i $PADDED_FILE -ss 00:00:10.000 -acodec copy $inputFile -y

cleanup

