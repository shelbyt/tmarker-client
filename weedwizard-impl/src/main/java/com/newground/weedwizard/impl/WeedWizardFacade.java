package com.newground.weedwizard.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableList;
import com.newground.weedwizard.impl.youtubedl.YoutubeDL;
import com.newground.weedwizard.impl.youtubedl.YoutubeDLException;
import com.newground.weedwizard.impl.youtubedl.YoutubeDLRequest;
import com.newground.weedwizard.impl.youtubedl.YoutubeDLResponse;
import com.newground.weedwizard.schemas.VideoBookmark;
import com.newground.weedwizard.schemas.VideoInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;

/**
 * Created by thomaschow on 9/5/16.
 */
public class WeedWizardFacade {
    private static final String MODULE = WeedWizardFacade.class.getName();
    private static final Logger LOG = LoggerFactory.getLogger(MODULE);
    private YoutubeDL youtubeDL;

    public WeedWizardFacade() {
        youtubeDL = new YoutubeDL();
    }

    public VideoBookmark create(VideoBookmark bookmark) throws Exception {
        String videoUrl = bookmark.getVideoUrl();
        LOG.info(videoUrl);
        downloadSubtitles(videoUrl);
        return null;
    }

    public List<VideoBookmark> findByVideoUrl(String videoUrl) throws Exception {
        LOG.info(videoUrl);
        return ImmutableList.of(new VideoBookmark());
    }

    private VideoInfo downloadSubtitles(String videoUrl) throws Exception {
        YoutubeDLRequest request = new YoutubeDLRequest(videoUrl, null);
        request.setOption("id");
        request.setOption("skip-download");
        request.setOption("no-check-certificate");
        request.setOption("write-sub");
        request.setOption("write-auto-sub");
        request.setOption("sub-lang", "en");
        request.setOption("sub-lang", "en");
        request.setOption("sub-format", "ttml/vtt");
        request.setOption("dump-json");
        request.setOption("no-playlist");
        YoutubeDLResponse response;
        try {
            response = YoutubeDL.execute(request);
        } catch (YoutubeDLException e) {
            throw new Exception("error getting data from youtube", e);
        }
        if (response != null) {
            try {
                LOG.info("HERE IS THE RESPONSE: " + response.getOut());
                VideoInfo videoInfo = new ObjectMapper().readValue(response.getOut(), VideoInfo.class);
                return videoInfo;
            } catch (IOException e) {
                throw new Exception("could not deserialize videoInfo", e);
            }
        }
        return null;
    }
}
