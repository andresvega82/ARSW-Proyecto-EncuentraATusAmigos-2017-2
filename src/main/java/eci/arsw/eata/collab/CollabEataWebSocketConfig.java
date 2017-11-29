/*
 * Copyright (C) 2016 Pivotal Software, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package eci.arsw.eata.collab;

/**
 *
 * @author hcadavid
 */
import java.util.logging.Logger;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import sun.awt.AWTAccessor;

@Configuration
@EnableWebSocketMessageBroker
public class CollabEataWebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableStompBrokerRelay("/topic/").setRelayHost("donkey.rmq.cloudamqp.com").setRelayPort(61613).
        setClientLogin("bmhyynue").
        setClientPasscode("mrptQNo6G7d__QEmeWzE9thbQ4OvvY3e").
        setSystemLogin("bmhyynue").
        setSystemPasscode("mrptQNo6G7d__QEmeWzE9thbQ4OvvY3e").
        setVirtualHost("bmhyynue");
        
        config.setApplicationDestinationPrefixes("/app");
        
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stompendpoint").setAllowedOrigins("*").withSockJS();    
        
    }
    

}
