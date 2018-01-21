<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results" style="overflow:auto;">
					<report-form-details></report-form-details>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import reportFormDetails from '@/components/reports/form-details';

export default {
	name: 'report-details',
	components: {
		navbar,
		reportFormDetails
	}
}
</script>
