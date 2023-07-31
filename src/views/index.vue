<template>
	<div>
		<el-button type="primary" @click="handleMessage">
			<el-icon :size="20" color="#000">
				<icon-ep-copy-document></icon-ep-copy-document>
			</el-icon>
			{{ count }}
		</el-button>
	</div>
</template>

<script setup lang="ts" name="index">
const count = ref(10)
const handleMessage = () => {
	ElMessage({
		message: 'Congrats, this is a success message.',
		type: 'success'
	})
}
</script>

<style scoped lang="scss"></style>
