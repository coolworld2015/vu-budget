<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results" style="overflow:auto;">
					<input-form-edit></input-form-edit>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import inputFormEdit from '@/components/inputs/form-edit';

export default {
	name: 'input-edit',
	components: {
		navbar,
		inputFormEdit
	}
}
</script>
