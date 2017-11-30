<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<resource-form-edit></resource-form-edit>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import resourceFormEdit from '@/components/resources/form-edit';

export default {
	name: 'resource-edit',
	components: {
		navbar,
		resourceFormEdit
	}
}
</script>
