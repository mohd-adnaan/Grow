/*
 * Copyright 2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.gradle.internal.deprecation;

import org.gradle.api.artifacts.Configuration;

import javax.annotation.Nullable;
import java.util.List;
import java.util.function.Function;

public interface DeprecatableConfiguration extends Configuration {

    /**
     * @return configurations that should be used to declare dependencies instead of this configuration.
     *         Returns 'null' if this configuration is not deprecated for declaration.
     */
    @Nullable
    List<String> getDeclarationAlternatives();

    /**
     * @return deprecation message builder to be used for nagging when this configuration is consumed.
     *         Returns 'null' if this configuration is not deprecated for consumption.
     */
    @Nullable
    DeprecationMessageBuilder.WithDocumentation getConsumptionDeprecation();

    /**
     * @return configurations that should be used to consume a component instead of consuming this configuration.
     *         Returns 'null' if this configuration is not deprecated for resolution.
     */
    @Nullable
    List<String> getResolutionAlternatives();

    /**
     * Allows plugins to deprecate a configuration that will be removed in the next major Gradle version.
     *
     * @param alternativesForDeclaring alternative configurations that can be used to declare dependencies
     * @return this configuration
     */
    DeprecatableConfiguration deprecateForDeclaration(String... alternativesForDeclaring);

    /**
     * Allows plugins to deprecate the consumability property (canBeConsumed() == true) of a configuration that will be changed in the next major Gradle version.
     *
     * @param deprecation deprecation message builder to use for nagging upon consumption of this configuration
     * @return this configuration
     */
    DeprecatableConfiguration deprecateForConsumption(Function<DeprecationMessageBuilder.DeprecateConfiguration, DeprecationMessageBuilder.WithDocumentation> deprecation);

    /**
     * Allows plugins to deprecate the resolvability property (canBeResolved() == true) of a configuration that will be changed in the next major Gradle version.
     *
     * @param alternativesForResolving alternative configurations that can be used for dependency resolution
     * @return this configuration
     */
    DeprecatableConfiguration deprecateForResolution(String... alternativesForResolving);

    default boolean canSafelyBeResolved() {
        if (!isCanBeResolved()) {
            return false;
        }
        List<String> resolutionAlternatives = getResolutionAlternatives();
        return resolutionAlternatives == null;
    }
}
