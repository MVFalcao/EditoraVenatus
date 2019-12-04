using EditoraAPI.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Grafo
{   
    
    class indicacao
    {
        private EditoraAPIContext db = new EditoraAPIContext();
        static void initialize_single_source(Grafoh g, Vertice s){
            foreach (KeyValuePair<int, Vertice> v in g.get_vertices()) {
                v.Value.set_distancia(int.MaxValue);
            }
            s.set_distancia(0);
        }

        static Vertice extract_min(SortedDictionary<int, Vertice> Q)
        {
            var key = Q.Keys.ToList()[0];
            Vertice min = Q[key];
            foreach (KeyValuePair<int, Vertice> v in Q)
            {
                if (v.Value.get_distancia() < min.get_distancia())
                {
                    min = v.Value;
                }
            }
            Q.Remove(min.get_id());
            return min;
        }
     
        static void relax(Vertice u, Vertice v) {

            int distancia = u.get_distancia() + u.get_peso(v);

            if (v.get_distancia() > distancia)
            {
                v.set_distancia(distancia);
                v.set_vertice_caminho_anterior(u);
                //Console.WriteLine("Atualizei a distância " + distancia + " do vértice " + u.get_id()  + " para o vértice " + v.get_id());
            }
            else {
                //Console.WriteLine("NÃO atualizei a distância " + distancia + " do vértice " + u.get_id() + " para o vértice " + v.get_id());
            }           
        }

        static void add_S(Vertice u, SortedDictionary<int, Vertice> S)
        {
            Vertice vertice;
            if (S.TryGetValue(u.get_id(), out vertice))
            {
                vertice = u;
            }
            else
            {
                S.Add(u.get_id(),u); 
            }
        }

        public static List<dynamic> Dijkstra(Grafoh g, Vertice s)
        {
            SortedDictionary<int, Vertice> Q = new SortedDictionary<int, Vertice>();
            List<dynamic> livros = new List<dynamic>();
            initialize_single_source(g, s);

            Q = g.get_vertices();

            SortedDictionary<int, Vertice> S = new SortedDictionary<int, Vertice>();

            while (Q.Count > 0) {

                Vertice u = extract_min(Q);

                u.set_visitado(true);

                foreach (KeyValuePair<Vertice, int> v in u.get_adjacentes()) {
                    if (v.Key.get_visitado() == true){
                        continue;
                    }
                    relax(u, v.Key);
                }
                add_S(u, S);
                livros.Add(u);
               // Console.Write(u.get_id() + ",");
            }

            /* S tem os pesos finais de caminho mínimos a partir da fonte determinada, assim atualiza o grafo 
             * com os vértices atualizados*/
            g.set_vertices(S);
            return livros;
        }

        public List<dynamic> inicializagrafo(int Id_Livro_Pesquisado)
        {

            List<dynamic> result = new List<dynamic>();
            Grafoh g = new Grafoh(true);
            Vertice origem;
           


            var livros = from l in db.livros select new { l.ID_Livro, l.Classificacao_Indicativa, l.Categoria };
            List<dynamic> livrosDois = new List<dynamic>();
           
            foreach(dynamic livro in livros)
            {
                g.inserir_vertice(livro.ID_Livro);
                livrosDois.Add(livro);
            }

           
            foreach(dynamic livro1 in livros)
            {
                foreach(dynamic livro2 in livrosDois)
                {
                    if(livro1.Categoria == livro2.Categoria)
                    {
                        if (livro1.Classificacao_Indicativa == "L" || livro2.Classificacao_Indicativa == "L")
                        {
                            livro1.Classificacao_Indicativa = 0;
                            livro2.Classificacao_Indicativa = 0;
                        }
                        if (livro1.Classificacao_Indicativa > livro2.Classificacao_Indicativa)
                        {
                           g.inserir_aresta(livro1.ID_Livro, livro2.ID_Livro, (livro1.Classificacao_Indicativa - livro2.Classificacao_Indicativa));
                        }
                        else
                        {
                           g.inserir_aresta(livro1.ID_Livro, livro2.ID_Livro, (livro2.Classificacao_Indicativa - livro1.Classificacao_Indicativa));
                        }
                        
                    }
                }
            }
            result = new List<dynamic>();


            origem = g.get_vertice(Id_Livro_Pesquisado);

            result = Dijkstra(g, g.get_vertice(Id_Livro_Pesquisado));
            return result;
             
        }

    }
}
