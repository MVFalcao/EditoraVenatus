USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Carrinho]    Script Date: 03/09/2019 11:07:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Carrinho](
	[ID_Carrinho] [int] NOT NULL,
	[ID_Compra] [int] NOT NULL,
	[ID_Livro] [int] NOT NULL,
	[Quantidade_Livro] [int] NOT NULL,
	[Preco_Total_Livro] [money] NOT NULL,
 CONSTRAINT [PK_TB_Carrinho] PRIMARY KEY CLUSTERED 
(
	[ID_Carrinho] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_Carrinho]  WITH CHECK ADD  CONSTRAINT [FK_TB_Carrinho_TB_Carrinho] FOREIGN KEY([ID_Compra])
REFERENCES [dbo].[TB_Compra] ([ID_Compra])
GO

ALTER TABLE [dbo].[TB_Carrinho] CHECK CONSTRAINT [FK_TB_Carrinho_TB_Carrinho]
GO

ALTER TABLE [dbo].[TB_Carrinho]  WITH CHECK ADD  CONSTRAINT [FK_TB_Carrinho_TB_Livro] FOREIGN KEY([ID_Livro])
REFERENCES [dbo].[TB_Livro] ([ID_Livro])
GO

ALTER TABLE [dbo].[TB_Carrinho] CHECK CONSTRAINT [FK_TB_Carrinho_TB_Livro]
GO
-----
USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Autor]    Script Date: 03/09/2019 11:08:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Autor](
	[ID_Autor] [int] NOT NULL,
	[CPF] [nvarchar](50) NOT NULL,
	[Nome] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_TB_Autor] PRIMARY KEY CLUSTERED 
(
	[ID_Autor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
---

USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Cliente]    Script Date: 03/09/2019 11:08:27 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Cliente](
	[ID_Cliente] [int] NOT NULL,
 CONSTRAINT [PK_TB_Cliente] PRIMARY KEY CLUSTERED 
(
	[ID_Cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

----
USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Compra]    Script Date: 03/09/2019 11:08:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Compra](
	[ID_Compra] [int] NOT NULL,
	[ID_Cliente] [int] NOT NULL,
	[ID_Tipo] [int] NOT NULL,
	[Preco_total] [money] NOT NULL,
	[Data_Pag] [date] NOT NULL,
 CONSTRAINT [PK_TB_Compra] PRIMARY KEY CLUSTERED 
(
	[ID_Compra] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_Compra]  WITH CHECK ADD  CONSTRAINT [FK_TB_Compra_TB_Cliente] FOREIGN KEY([ID_Cliente])
REFERENCES [dbo].[TB_Cliente] ([ID_Cliente])
GO

ALTER TABLE [dbo].[TB_Compra] CHECK CONSTRAINT [FK_TB_Compra_TB_Cliente]
GO

ALTER TABLE [dbo].[TB_Compra]  WITH CHECK ADD  CONSTRAINT [FK_TB_Compra_TB_Tipo] FOREIGN KEY([ID_Tipo])
REFERENCES [dbo].[TB_Tipo] ([ID_Tipo])
GO

ALTER TABLE [dbo].[TB_Compra] CHECK CONSTRAINT [FK_TB_Compra_TB_Tipo]
GO
----
USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Cupom]    Script Date: 03/09/2019 11:09:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Cupom](
	[ID_Cupom] [int] NOT NULL,
	[Valor_Desconto] [numeric](18, 0) NOT NULL,
	[Nome] [nvarchar](max) NOT NULL,
	[Data_ini] [date] NOT NULL,
	[Data_fim] [date] NOT NULL,
 CONSTRAINT [PK_TB_Cupom] PRIMARY KEY CLUSTERED 
(
	[ID_Cupom] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

----
USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Cupom_Livro]    Script Date: 03/09/2019 11:10:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Cupom_Livro](
	[ID_Cupom_Livro] [int] NOT NULL,
	[ID_Cupom] [int] NOT NULL,
	[ID_Livro] [int] NOT NULL,
 CONSTRAINT [PK_TB_Cupom_Livro] PRIMARY KEY CLUSTERED 
(
	[ID_Cupom_Livro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_Cupom_Livro]  WITH CHECK ADD  CONSTRAINT [FK_TB_Cupom_Livro_TB_Cupom] FOREIGN KEY([ID_Cupom])
REFERENCES [dbo].[TB_Cupom] ([ID_Cupom])
GO

ALTER TABLE [dbo].[TB_Cupom_Livro] CHECK CONSTRAINT [FK_TB_Cupom_Livro_TB_Cupom]
GO

ALTER TABLE [dbo].[TB_Cupom_Livro]  WITH CHECK ADD  CONSTRAINT [FK_TB_Cupom_Livro_TB_Livro] FOREIGN KEY([ID_Livro])
REFERENCES [dbo].[TB_Livro] ([ID_Livro])
GO

ALTER TABLE [dbo].[TB_Cupom_Livro] CHECK CONSTRAINT [FK_TB_Cupom_Livro_TB_Livro]
GO

----

USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Cupom_Pessoa]    Script Date: 03/09/2019 11:10:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Cupom_Pessoa](
	[ID_Cupom_Pessoa] [int] NOT NULL,
	[ID_Cupom] [int] NOT NULL,
	[ID_Pessoa] [int] NOT NULL,
 CONSTRAINT [PK_TB_Cupom_Pessoa] PRIMARY KEY CLUSTERED 
(
	[ID_Cupom_Pessoa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_Cupom_Pessoa]  WITH CHECK ADD  CONSTRAINT [FK_TB_Cupom_Pessoa_TB_Cupom_Pessoa] FOREIGN KEY([ID_Cupom])
REFERENCES [dbo].[TB_Cupom] ([ID_Cupom])
GO

ALTER TABLE [dbo].[TB_Cupom_Pessoa] CHECK CONSTRAINT [FK_TB_Cupom_Pessoa_TB_Cupom_Pessoa]
GO

ALTER TABLE [dbo].[TB_Cupom_Pessoa]  WITH CHECK ADD  CONSTRAINT [FK_TB_Cupom_Pessoa_TB_Cupom_Pessoa1] FOREIGN KEY([ID_Pessoa])
REFERENCES [dbo].[TB_Pessoa] ([ID_Pessoa])
GO

ALTER TABLE [dbo].[TB_Cupom_Pessoa] CHECK CONSTRAINT [FK_TB_Cupom_Pessoa_TB_Cupom_Pessoa1]
GO

----

USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Endereco]    Script Date: 03/09/2019 11:11:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Endereco](
	[ID_Endereco] [int] NOT NULL,
	[ID_AutorCliente] [int] NOT NULL,
	[CEP] [nvarchar](50) NOT NULL,
	[Cidade] [nvarchar](50) NOT NULL,
	[Bairro] [nvarchar](50) NOT NULL,
	[Complemento] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TB_Endereco] PRIMARY KEY CLUSTERED 
(
	[ID_Endereco] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_Endereco]  WITH CHECK ADD  CONSTRAINT [FK_TB_Endereco_TB_Autor] FOREIGN KEY([ID_AutorCliente])
REFERENCES [dbo].[TB_Autor] ([ID_Autor])
GO

ALTER TABLE [dbo].[TB_Endereco] CHECK CONSTRAINT [FK_TB_Endereco_TB_Autor]
GO

ALTER TABLE [dbo].[TB_Endereco]  WITH CHECK ADD  CONSTRAINT [FK_TB_Endereco_TB_Cliente] FOREIGN KEY([ID_AutorCliente])
REFERENCES [dbo].[TB_Cliente] ([ID_Cliente])
GO

ALTER TABLE [dbo].[TB_Endereco] CHECK CONSTRAINT [FK_TB_Endereco_TB_Cliente]
GO

----

USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Estoque]    Script Date: 03/09/2019 11:11:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Estoque](
	[ID_Estoque] [int] NOT NULL,
	[ID_Livro] [int] NOT NULL,
	[Quantidade] [int] NOT NULL,
 CONSTRAINT [PK_TB_Estoque] PRIMARY KEY CLUSTERED 
(
	[ID_Estoque] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_Estoque]  WITH CHECK ADD  CONSTRAINT [FK_TB_Estoque_TB_Estoque] FOREIGN KEY([ID_Livro])
REFERENCES [dbo].[TB_Livro] ([ID_Livro])
GO

ALTER TABLE [dbo].[TB_Estoque] CHECK CONSTRAINT [FK_TB_Estoque_TB_Estoque]
GO

----

USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Livraria]    Script Date: 03/09/2019 11:11:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Livraria](
	[ID_Livraria] [int] NOT NULL,
	[ID_Cliente] [int] NOT NULL,
	[CNPJ] [nvarchar](50) NOT NULL,
	[Tipo_consignacao] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_TB_Livraria] PRIMARY KEY CLUSTERED 
(
	[ID_Livraria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_Livraria]  WITH CHECK ADD  CONSTRAINT [FK_TB_Livraria_TB_Cliente] FOREIGN KEY([ID_Cliente])
REFERENCES [dbo].[TB_Cliente] ([ID_Cliente])
GO

ALTER TABLE [dbo].[TB_Livraria] CHECK CONSTRAINT [FK_TB_Livraria_TB_Cliente]
GO
----

USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Livro]    Script Date: 03/09/2019 11:11:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Livro](
	[ID_Livro] [int] NOT NULL,
	[Titulo] [nvarchar](max) NOT NULL,
	[Descrição] [nvarchar](max) NOT NULL,
	[Preco] [money] NOT NULL,
	[Data_Publicacao] [date] NOT NULL,
	[Numero_Paginas] [int] NOT NULL,
	[Ilustrador] [nvarchar](50) NOT NULL,
	[Tipo_Livro] [nchar](10) NULL,
	[ISBN] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TB_Livro] PRIMARY KEY CLUSTERED 
(
	[ID_Livro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

-----

USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Livro_Autor]    Script Date: 03/09/2019 11:12:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Livro_Autor](
	[ID_Livro_Autor] [int] NOT NULL,
	[ID_Livro] [int] NOT NULL,
	[ID_Autor] [int] NOT NULL,
 CONSTRAINT [PK_TB_Livro_Autor] PRIMARY KEY CLUSTERED 
(
	[ID_Livro_Autor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_Livro_Autor]  WITH CHECK ADD  CONSTRAINT [FK_TB_Livro_Autor_TB_Autor] FOREIGN KEY([ID_Autor])
REFERENCES [dbo].[TB_Autor] ([ID_Autor])
GO

ALTER TABLE [dbo].[TB_Livro_Autor] CHECK CONSTRAINT [FK_TB_Livro_Autor_TB_Autor]
GO

ALTER TABLE [dbo].[TB_Livro_Autor]  WITH CHECK ADD  CONSTRAINT [FK_TB_Livro_Autor_TB_Livro] FOREIGN KEY([ID_Livro])
REFERENCES [dbo].[TB_Livro] ([ID_Livro])
GO

ALTER TABLE [dbo].[TB_Livro_Autor] CHECK CONSTRAINT [FK_TB_Livro_Autor_TB_Livro]
GO

-----

USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Pessoa]    Script Date: 03/09/2019 11:12:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Pessoa](
	[ID_Pessoa] [int] NOT NULL,
	[ID_Cliente] [int] NOT NULL,
	[CPF] [nvarchar](50) NOT NULL,
	[Nome] [nvarchar](max) NOT NULL,
	[Desconto] [numeric](18, 0) NOT NULL,
	[Tipo_Pessoa] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TB_Pessoa] PRIMARY KEY CLUSTERED 
(
	[ID_Pessoa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_Pessoa]  WITH CHECK ADD  CONSTRAINT [FK_TB_Pessoa_TB_Cliente] FOREIGN KEY([ID_Cliente])
REFERENCES [dbo].[TB_Cliente] ([ID_Cliente])
GO

ALTER TABLE [dbo].[TB_Pessoa] CHECK CONSTRAINT [FK_TB_Pessoa_TB_Cliente]
GO

USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Pessoa]    Script Date: 03/09/2019 11:12:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Pessoa](
	[ID_Pessoa] [int] NOT NULL,
	[ID_Cliente] [int] NOT NULL,
	[CPF] [nvarchar](50) NOT NULL,
	[Nome] [nvarchar](max) NOT NULL,
	[Desconto] [numeric](18, 0) NOT NULL,
	[Tipo_Pessoa] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TB_Pessoa] PRIMARY KEY CLUSTERED 
(
	[ID_Pessoa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_Pessoa]  WITH CHECK ADD  CONSTRAINT [FK_TB_Pessoa_TB_Cliente] FOREIGN KEY([ID_Cliente])
REFERENCES [dbo].[TB_Cliente] ([ID_Cliente])
GO

ALTER TABLE [dbo].[TB_Pessoa] CHECK CONSTRAINT [FK_TB_Pessoa_TB_Cliente]
GO

------


USE [Editora]
GO

/****** Object:  Table [dbo].[TB_RedeSocial]    Script Date: 03/09/2019 11:12:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_RedeSocial](
	[ID_RedeSocial] [int] NOT NULL,
	[ID_AutorCliente] [int] NOT NULL,
	[Email] [nvarchar](max) NULL,
	[Instagram] [nvarchar](max) NULL,
	[Twitter] [nvarchar](max) NULL,
	[Facebook] [nvarchar](max) NULL,
 CONSTRAINT [PK_TB_RedeSocial] PRIMARY KEY CLUSTERED 
(
	[ID_RedeSocial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_RedeSocial]  WITH CHECK ADD  CONSTRAINT [FK_TB_RedeSocial_TB_Autor] FOREIGN KEY([ID_AutorCliente])
REFERENCES [dbo].[TB_Autor] ([ID_Autor])
GO

ALTER TABLE [dbo].[TB_RedeSocial] CHECK CONSTRAINT [FK_TB_RedeSocial_TB_Autor]
GO

ALTER TABLE [dbo].[TB_RedeSocial]  WITH CHECK ADD  CONSTRAINT [FK_TB_RedeSocial_TB_Cliente] FOREIGN KEY([ID_AutorCliente])
REFERENCES [dbo].[TB_Cliente] ([ID_Cliente])
GO

ALTER TABLE [dbo].[TB_RedeSocial] CHECK CONSTRAINT [FK_TB_RedeSocial_TB_Cliente]
GO




------



USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Telefone]    Script Date: 03/09/2019 11:12:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Telefone](
	[ID_Telefone] [int] NOT NULL,
	[Tipo_Telefone] [nvarchar](50) NOT NULL,
	[Numero] [nvarchar](50) NOT NULL,
	[ID_AutorCliente] [int] NOT NULL,
 CONSTRAINT [PK_TB_Telefone] PRIMARY KEY CLUSTERED 
(
	[ID_Telefone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_Telefone]  WITH CHECK ADD  CONSTRAINT [FK_TB_Telefone_TB_Autor] FOREIGN KEY([ID_AutorCliente])
REFERENCES [dbo].[TB_Autor] ([ID_Autor])
GO

ALTER TABLE [dbo].[TB_Telefone] CHECK CONSTRAINT [FK_TB_Telefone_TB_Autor]
GO

ALTER TABLE [dbo].[TB_Telefone]  WITH CHECK ADD  CONSTRAINT [FK_TB_Telefone_TB_Cliente] FOREIGN KEY([ID_AutorCliente])
REFERENCES [dbo].[TB_Cliente] ([ID_Cliente])
GO

ALTER TABLE [dbo].[TB_Telefone] CHECK CONSTRAINT [FK_TB_Telefone_TB_Cliente]
GO


-----

USE [Editora]
GO

/****** Object:  Table [dbo].[TB_Tipo]    Script Date: 03/09/2019 11:13:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_Tipo](
	[ID_Tipo] [int] NOT NULL,
	[Descricao] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_TB_Tipo] PRIMARY KEY CLUSTERED 
(
	[ID_Tipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO





