<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<project-form-add></project-form-add>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import projectFormAdd from '@/components/projects/form-add';

export default {
	name: 'project-add',
	components: {
		navbar,
		projectFormAdd
	}
}
</script>
