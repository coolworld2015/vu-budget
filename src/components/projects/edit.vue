<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<project-form-edit></project-form-edit>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import projectFormEdit from '@/components/projects/form-edit';

export default {
	name: 'project-edit',
	components: {
		navbar,
		projectFormEdit
	}
}
</script>
