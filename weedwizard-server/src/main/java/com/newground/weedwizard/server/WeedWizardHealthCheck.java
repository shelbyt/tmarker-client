package com.newground.weedwizard.server;

import com.yammer.metrics.core.HealthCheck;

/**
 * Created by thomaschow on 9/3/16.
 */
public class WeedWizardHealthCheck extends HealthCheck {

    public WeedWizardHealthCheck() {
        super("weedcheck");
    }

    @Override
    protected Result check() throws Exception {
        return Result.healthy();
    }
}
