/*
    Copyright 2016 Jaycliff Arcilla of Eversun Software Philippines Corporation

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
if (typeof jQuery.fn.perfectScrollbar === "function") {
    jQuery.fn.perfectScrollbar = (function (originalPSB) {
        "use strict";
        var dummy = {}, list_of_instances = [], list_of_state = [], index, raf_id;
        function rafCallback() {
            var k, len, instance, state, curr_width, curr_height;
            for (k = 0, len = list_of_instances.length; k < len; k += 1) {
                instance = list_of_instances[k];
                if (instance !== dummy && instance.is(':visible')) {
                    state = list_of_state[k];
                    curr_width = instance.width();
                    curr_height = instance.height();
                    if (state.width !== curr_width || state.height !== curr_height) {
                        instance.perfectScrollbar('update');
                        state.width = curr_width;
                        state.height = curr_height;
                    }
                }
            }
            raf_id = requestAnimationFrame(rafCallback);
        }
        rafCallback();
        return function perfectScrollbar(param) {
            switch (typeof param) {
            case 'string':
                if (param === 'destroy') {
                    list_of_instances[$.data(this[0], 'psb-autoupdater-index')] = dummy;
                }
                break;
            default:
                index = list_of_instances.length;
                $.data(this[0], 'psb-autoupdater-index', index);
                list_of_instances.push(this);
                list_of_state.push({
                    width: this.width(),
                    height: this.height()
                });
            }
            originalPSB.call(this, param);
            return this;
        };
    }(jQuery.fn.perfectScrollbar));
}