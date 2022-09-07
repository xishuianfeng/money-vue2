<template>
    <div>
        <label class="note">
            <span class="name">备注</span>
            <input type="text" placeholder="在这里输入备注">
        </label>
    </div>

</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss">
    .note{
        font-size: 14px;
        background: #f5f5f5;
        display: block;
        padding-left: 0 16px;
        display: flex;
        align-items: center;
        .name{
        padding-right: 16px;
      }
    input{
        height: 64px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding: 16px;
      }
    }
</style>