<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name='left' @click.native="goBack"/>
      <span class="title">编辑标签</span>
			<span class="rightIcon"></span>
    </div>
			<div class="formWrapper">
				<FormItem :value="tag.name" 
					@update:value="update"
					fieldName="标签名" 
					placeholder="请输入标签名"/>
			</div>
			<div class="buttonWrapper">
      	<Button @click="remove">删除标签</Button>
			</div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import FormItem from '../components/Money/FormItem.vue';
  import Button from '@/components/Money/Botton.vue'
  

  @Component({
    components:{FormItem,Button},
  })
  
  export default class EditLabels extends Vue{
	get tag(){
		return this.$store.state.currentTag
	}

	created(){
		const id = this.$route.params.id;
		this.$store.commit('fetchTags');
		this.$store.commit('setCurrentTag',id);
		if(!this.tag){
			this.$router.replace('/404');
		}
	}

	update(name:string){
		if(this.tag){
			this.$store.commit('updateTag',{id: this.tag.id, name});
		}
	}

	remove(){
		if(this.tag){
			this.$store.commit('removeTag',this.tag.id);
		}	
	}

	goBack(){
		this.$router.back();
	}
}
</script>

<style lang="scss" scoped>
  .navBar{
    text-align: center;
		padding: 12px 16px;
		background: white;
    font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
    >.leftIcon{
			width: 24px;
			height: 24px;
    }
		>.rightIcon{
			width: 24px;
			height: 24px;
		}
  }
	.formWrapper{
		background: white;
		margin-top: 8px;
	}
	.buttonWrapper{
		text-align: center;
		padding: 16px;
		margin-top: 44-16px;
	}
</style>