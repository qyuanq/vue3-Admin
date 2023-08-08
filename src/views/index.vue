<template>
	<div :class="bem.b()">
		<el-button type="primary" @click="handleMessage">
			<el-icon :size="20" color="#000">
				<icon-ep-copy-document></icon-ep-copy-document>
			</el-icon>
			<span :class="bem.e('count')">{{ count }}</span>
		</el-button>
	</div>
</template>

<script setup lang="ts" name="index">
import { useNamespace } from '@/hooks/useNamespace'

const bem = useNamespace('index')
const count = ref(10)
const handleMessage = () => {
	ElMessage({
		message: 'Congrats, this is a success message.',
		type: 'success'
	})
}
</script>

<style lang="scss">
@import './index.scss';
</style>
