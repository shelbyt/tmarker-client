package com.newground.weedwizard.api;

import com.newground.weedwizard.impl.WeedWizardFacade;
import com.newground.weedwizard.schemas.VideoBookmark;
import com.yammer.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/weedwizard")
public class VideoBookmarkResource {
    private static final String MODULE = VideoBookmarkResource.class.getName();
    private static final Logger LOG = LoggerFactory.getLogger(MODULE);

    private final WeedWizardFacade weedWizardFacade;

    public VideoBookmarkResource() {
        weedWizardFacade = new WeedWizardFacade();
    }

    @POST
    @Timed
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public VideoBookmark create(@Valid VideoBookmark bookmark) throws Exception {
        if (bookmark == null) {
            LOG.warn("attempted to create null entity");
        } else {
            weedWizardFacade.create(bookmark);
            LOG.info("Received request");
        }
        return bookmark;
    }

    @GET
    @Timed
    @Produces(MediaType.APPLICATION_JSON)
    public Response findByVideoUrl(@QueryParam("videoUrl") String videoUrl) throws Exception {
        List<VideoBookmark> results = weedWizardFacade.findByVideoUrl(videoUrl);
        return Response.ok().entity(results).build();
    }
}