package com.newground.weedwizard.server;

import com.newground.weedwizard.api.VideoBookmarkResource;
import com.yammer.dropwizard.Service;
import com.yammer.dropwizard.config.Bootstrap;
import com.yammer.dropwizard.config.Environment;

public class WeedWizardService extends Service<WeedWizardConfiguration> {
    public static void main(String[] args) throws Exception {
        new WeedWizardService().run(args);
    }

    @Override
    public void initialize(Bootstrap<WeedWizardConfiguration> bootstrap) {
        bootstrap.setName("hello-world");
    }

    @Override
    public void run(WeedWizardConfiguration configuration,
                    Environment environment) {
        environment.addResource(new VideoBookmarkResource());
        environment.addHealthCheck(new WeedWizardHealthCheck());
    }
}