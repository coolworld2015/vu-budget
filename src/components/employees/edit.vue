<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<department-form-edit></department-form-edit>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import departmentFormEdit from '@/components/departments/form-edit';

export default {
	name: 'department-edit',
	components: {
		navbar,
		departmentFormEdit
	}
}
</script>
