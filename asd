<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Backend II</title>
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
			crossorigin="anonymous"
		/>
	</head>
	<body>
		<div class="container m-auto vh-100"></div>
			<header class="header row justify-content-between">
				<h1 class="col-12 text-center">Mariano Saavedra</h1>
				<button class="col-2 p-1 bg-primary fw-bolder rounded-2"><a
				href="http://localhost:8080/"
				class="text-dark d-block"
				>Home</a></button>
				<button class="col-2 p-1 bg-primary fw-bolder rounded-2"><a
				href="http://localhost:8080/products"
				class="text-dark d-block"
				>Products</a></button>
				<button class="col-2 p-1 bg-primary fw-bolder rounded-2"><a
				href="http://localhost:8080/realtimeproducts"
				class="text-dark d-block"
				>Real Time Products</a></button>
			</header>
			<main class="main row min-vh-100">
				{{{body}}}
			</main>
			<footer class="footer row text-center">
				<small>Todos mis derechos no estan reservados</small>
			</footer>
		</div>
	</body>
</html>