FROM jrottenberg/ffmpeg:4.2-ubuntu

RUN apt-get -yqq update && \
    apt-get install -yq --no-install-recommends python3-pip && \
    apt-get autoremove -y && \
    apt-get clean -y

RUN pip3 install ffmpeg-normalize

COPY normalize.sh /normalize.sh
RUN chmod +x /normalize.sh

ENTRYPOINT ["/normalize.sh"]
