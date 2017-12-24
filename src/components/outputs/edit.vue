<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results" style="overflow:auto;">
					<output-form-edit></output-form-edit>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import outputFormEdit from '@/components/outputs/form-edit';

export default {
	name: 'output-edit',
	components: {
		navbar,
		outputFormEdit
	}
}
</script>
