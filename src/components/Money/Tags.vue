<template>
    <div class="tags">
    <div class="news">
        <button>新增标签</button>
    </div>
    <ul class="current">
        <li v-for="tag in dataSource" :key="tag"
            :class="{selected: selectedTags.indexOf(tag)>=0}"
            @click="toggle(tag)">{{tag}}
        </li>
    </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component
    export default class Tags extends Vue{
        @Prop() dataSource:string[] | undefined;
        selectedTags :string[] = [];

        toggle(tag:string){
            const index = this.selectedTags.indexOf(tag);
            if(index>=0){
                this.selectedTags.splice(index,1);
            }else{
                this.selectedTags.push(tag);
            }
        };
    }
</script>

<style lang="scss">
    .tags{
        display: flex;
        flex-direction: column-reverse;
        font-size: 14px;
        padding: 16px;
        flex-grow: 1;
    >.current{
        display: flex;
        flex-wrap: wrap;
        >li{
            $bg:#d9d9d9;
            background: #d9d9d9;
            $h:24px;
            line-height: $h;
            height: $h;
            border-radius: ($h/2);
            padding: 0 16px;
            margin-top: 4px;
            margin-right: 12px;
            &.selected{
                color: #fff;
                background: darken($bg,50%);
            }
        }
      }
      >.news{
        padding-top: 16px;
        > button{
            background:transparent;
            border: none;
            color: #999;
            border-bottom: 1px solid;
            padding: 0 3px;
        }
      }
    }
</style>