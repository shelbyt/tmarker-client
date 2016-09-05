package com.newground.weedwizard.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.newground.weedwizard.impl.youtubedl.YoutubeDL;
import com.newground.weedwizard.impl.youtubedl.YoutubeDLException;
import com.newground.weedwizard.impl.youtubedl.YoutubeDLRequest;
import com.newground.weedwizard.impl.youtubedl.YoutubeDLResponse;
import com.newground.weedwizard.schemas.VideoBookmark;
import com.newground.weedwizard.schemas.VideoInfo;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by thomaschow on 9/5/16.
 */
public class WeedWizardFacade {
    private static final String MODULE = WeedWizardFacade.class.getName();
    private static final Logger LOG = LoggerFactory.getLogger(MODULE);
    private Map<String, List<VideoBookmark>> bookmarkCache;

    public WeedWizardFacade() {
        bookmarkCache = new ConcurrentHashMap<>();
    }

    public VideoBookmark create(VideoBookmark bookmark) throws Exception {
        if (bookmark != null) {
            String videoUrl = bookmark.getVideoUrl();
            bookmarkCache.computeIfAbsent(videoUrl, k -> new ArrayList<>());
            bookmarkCache.get(videoUrl).add(bookmark);
            LOG.info(videoUrl);
            downloadSubtitles(videoUrl);
        }
        return null;
    }

    public List<VideoBookmark> findByVideoUrl(String videoUrl) throws Exception {
        if (StringUtils.isNotEmpty(videoUrl)) {
            LOG.info(videoUrl);
            return bookmarkCache.get(videoUrl);
        }
        return null;
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
