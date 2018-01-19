<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results" style="overflow:auto;">
					<report-form-edit></report-form-edit>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import reportFormEdit from '@/components/reports/form-edit';

export default {
	name: 'report-edit',
	components: {
		navbar,
		reportFormEdit
	}
}
</script>
