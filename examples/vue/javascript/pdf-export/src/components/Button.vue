<!--
/**
 * @author Saki
 * @date 2019-03-28 22:56:21
 * @Last Modified by: Saki
 * @Last Modified time: 2019-03-29 09:44:53
 *
 * This is a simple wrapper around Bryntum button
 */
-->
<template>
    <div></div>
</template>

<script>
    import { WidgetHelper } from 'bryntum-gantt';
    import { eventBus } from '../main';

    export default {
        props : {
            text    : { type : String, default : 'Button' },
            tooltip : String,
            color   : { type : String, default : 'b-orange b-raised' },
            action  : { type : String, default : 'action' }
        },

        mounted() {
            var props = this.$props;

            WidgetHelper.createWidget({
                type     : 'button',
                action   : props.action,
                appendTo : this.$el,
                color    : props.color,
                cls      : props.cls,
                text     : props.text,
                tooltip  : props.tooltip,
                onAction : ({ source }) => eventBus.$emit('click', source.action)
            });

        } // eo function mounted

    }; // eo Button export
</script>

<!-- eof -->
