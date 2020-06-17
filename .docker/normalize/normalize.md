# Noramlizing audio level

> Audio normalization is the application of a constant amount of gain to an audio recording to bring the amplitude to a target level (the norm). Because the same amount of gain is applied across the entire recording, the signal-to-noise ratio and relative dynamics are unchanged. Normalization is one of the functions commonly provided by a digital audio workstation. https://en.wikipedia.org/wiki/Audio_normalization

In other words, normalizing Kaamelott sounds allow each sound to have a ~same perceived audio loudness. So it reduce the volume of very loud sound and increase the volume of less audible ones. 

## Prerequisite

- install `ffmpeg`  using your preferred package managed (brew or apt-get for eg) or [this link](https://www.ffmpeg.org/download.html)
- install `ffmpeg-normalize` following [this](https://github.com/slhck/ffmpeg-normalize#installation)

With Docker:

```
docker build -t ks-normalize .docker/normalize/
```

## Usage

Normalize a given sound file

```
docker run --rm -v $(pwd):$(pwd) -w $(pwd) ks-normalize sounds/victoriae_mundis.mp3
```
It will copy replace the file with the new normalized sound to `victoriae_mundis.mp3`. 
