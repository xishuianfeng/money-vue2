<template>
    <div class="numberPad">
        <div class="output">{{output}}</div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="remove">删除</button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="clear">清空</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button @click="ok" class="ok">OK</button>
            <button @click="inputContent" class="zero">0</button>
            <button @click="inputContent">.</button>
        </div>
    </div>  
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue{
    output:string='0';

    inputContent(event:MouseEvent){
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      if(this.output.length === 16){return;}
      if(this.output === '0'){
        if('0123456789'.indexOf(input) >= 0){
          this.output = input;
        }else{
          this.output += input;
        }
        return
      }
      if(this.output.indexOf('.')>=0 && input === '.'){
        return;
      }
          this.output += input;
      };

      remove(){
        this.output = this.output.slice(0,-1);
        if(this.output === ''){this.output = '0'}
      };

      clear(){
        this.output = '0';
      }

      ok(){
        this.$emit('update:value',this.output);
        this.$emit('submit',this.output)
        this.output = '0'
      };
    };
</script>

<style lang="scss">
    @import '@/assets/style/help.scss';
    .numberPad{
      .output{
        @extend %clearfix;
        @extend %innerShadow;
        font-size: 36px;
        font-family: Consolas,monospace;
        padding: 9px 16px;
        text-align: right;
        height: 72px;
      }
      .buttons{
        @extend %clearfix;
        > button{
          font-family: $font-hei;
          float: left;
          width: 25%;
          height: 64px;
          background: transparent;
          border: none;
          &.ok{
            height: 64*2px;
            float: right;
          }
          &.zero{
            width: 25*2%;
          }
          $bc:#F0F8FF;
          &:nth-child(1){
            background-color: $bc;
          }
          &:nth-child(2),&:nth-child(5){
            background-color: darken($bc, 5%);
          }
          &:nth-child(3),&:nth-child(6),&:nth-child(9){
            background-color: darken($bc, 5%*2);
          }
          &:nth-child(4),&:nth-child(7),&:nth-child(10){
            background-color: darken($bc, 5%*3);
          }
          &:nth-child(8),&:nth-child(11),&:nth-child(13){
            background-color: darken($bc, 5%*4);
          }
          &:nth-child(14){
            background-color: darken($bc, 5%*5);
          }
          &:nth-child(12){
            background-color: darken($bc, 5%*6);
          }
        }
      }
    }
</style>