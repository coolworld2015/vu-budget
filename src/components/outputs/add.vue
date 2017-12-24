<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results" style="overflow:auto;">
					<output-form-add></output-form-add>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import outputFormAdd from '@/components/outputs/form-add';

export default {
	name: 'output-add',
	components: {
		navbar,
		outputFormAdd
	}
}
</script>
