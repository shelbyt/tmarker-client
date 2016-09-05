package com.newground.weedwizard.server;

import com.yammer.dropwizard.config.Configuration;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotEmpty;

public class WeedWizardConfiguration extends Configuration {
    @NotEmpty
    @JsonProperty
    private String template;

    @NotEmpty
    @JsonProperty
    private String defaultName = "Stranger";

    @NotEmpty
    @JsonProperty
    private String dbName;

    @NotEmpty
    @JsonProperty
    private String dbHost = "Stranger";

    @NotEmpty
    @JsonProperty
    private String dbPort;

    @NotEmpty
    @JsonProperty
    private String dbUsername = "Stranger";

    @NotEmpty
    @JsonProperty
    private String dbPassword;

    public String getTemplate() {
        return template;
    }

    public String getDefaultName() {
        return defaultName;
    }

    public String getDbName() {
        return dbName;
    }

    public String getDbHost() {
        return dbHost;
    }

    public String getDbPort() {
        return dbPort;
    }

    public String getDbUsername() {
        return dbUsername;
    }

    public String getDbPassword() {
        return dbPassword;
    }
}