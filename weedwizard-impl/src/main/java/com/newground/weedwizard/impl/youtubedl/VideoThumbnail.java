package com.newground.weedwizard.impl.youtubedl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VideoThumbnail {
    public String url;
    public String id;
}
