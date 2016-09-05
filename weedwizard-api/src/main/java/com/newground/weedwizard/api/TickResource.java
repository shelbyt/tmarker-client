package com.newground.weedwizard.api;

import com.newground.weedwizard.schemas.Tick;
import com.yammer.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/weedwizard")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TickResource {
    private static final String MODULE = TickResource.class.getName();
    private static final Logger LOG = LoggerFactory.getLogger(MODULE);

    public TickResource() {
    }

    @POST
    @Timed
    public Tick create(Tick tick) {
        if (tick == null) {
            LOG.warn("attempted to create null entity");
        }
        LOG.info("Received request");
        return tick;
    }
}