<template>
    <div>
        <label class="formItem">
            <span class="name">{{fieldName}}</span>
            <input type="text"
                   :value="value"
                   @input="onValueChanged($event.target.value)"
                   :placeholder="placeholder">
        </label>
    </div>

</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue{
    @Prop({default:''}) readonly value! :string ;

    @Prop({required:true}) fieldName!:string; //required:true 必填
    @Prop() placeholder?:string; 

    onValueChanged(value:string){
      this.$emit('update:value',value);
    };
  }
</script>

<style lang="scss">
    .formItem{
        font-size: 14px;
        padding-left: 0 16px;
        display: flex;
        align-items: center;
        .name{
        padding-left: 16px;
      }
    input{
        height: 40px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding: 16px;
      }
    }
</style>