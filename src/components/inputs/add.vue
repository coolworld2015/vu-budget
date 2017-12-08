<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<input-form-add></input-form-add>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import inputFormAdd from '@/components/inputs/form-add';

export default {
	name: 'input-add',
	components: {
		navbar,
		inputFormAdd
	}
}
</script>
