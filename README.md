# Barbijina zgodba

Majhna slovenska izobraževalna spletna stran o zgodovini Barbie, pripravljena za iPad in skupno branje z otrokom.

## Kaj je vključeno

- React + TypeScript + Vite
- odzivna postavitev za iPad v pokončnem in ležečem načinu
- 9 interaktivnih vsebinskih postaj
- preklop med običajnimi in VELIKIMI ČRKAMI
- časovni trak, galerija s povečanjem in kviz
- originalne ilustracije, shranjene v webdev asset storage
- Vercel konfiguracija z nastavitvijo za client-side SPA routing

## Lokalni razvoj

```bash
pnpm install
pnpm dev
```

Preverjanje tipov in produkcijski build:

```bash
pnpm check
pnpm build
```

## GitHub

V korenu projekta ustvari repozitorij in ga poveži s svojim GitHubom:

```bash
git init
git add .
git commit -m "Initial Slovenian Barbie history prototype"
git branch -M main
git remote add origin https://github.com/UPORABNIK/barbie-zgodba.git
git push -u origin main
```

Pred ukazom `git remote add origin` zamenjaj URL s svojim GitHub repozitorijem.

## Vercel

V Vercelu izberi **Add New Project**, uvozi GitHub repozitorij in uporabi te nastavitve:

- **Framework Preset:** Vite
- **Build Command:** `pnpm build`
- **Output Directory:** `dist/public`
- **Install Command:** `pnpm install`

Nastavitve so že zapisane tudi v `vercel.json`.

## Supabase – kasnejša razširitev

Prva različica Supabase še ne potrebuje, ker je vsebina statična in je napredek shranjen lokalno v brskalniku. Supabase lahko varno dodamo v naslednjem koraku za:

- urejanje vsebine brez spreminjanja kode;
- shranjevanje dovoljenih slik v Storage;
- shranjevanje galerijskih napisov in virov;
- družinski uporabniški račun;
- sinhronizacijo napredka med napravami.

Ko bo Supabase dodan, naj bodo javne vrednosti v Vercelu nastavljene kot `VITE_SUPABASE_URL` in `VITE_SUPABASE_ANON_KEY`. Skrivnih servisnih ključev ne smemo pošiljati v brskalnik.

### Samodejno branje galerije

Galerija zdaj poskuša prebrati datoteke iz javnega bucketa `barb`. Javni ogled posamezne datoteke in dovoljenje za izpis seznama datotek sta v Supabase Storage ločeni pravici. Če galerija še vedno pokaže prototipne slike, v Supabase SQL Editorju enkrat izvedite spodnji ukaz:

```sql
create policy "Allow public gallery listing"
on storage.objects
for select
to anon
using (bucket_id = 'barb');
```

Bucket `barb` mora ostati nastavljen kot **Public**. Spletna stran uporablja samo `anon` ključ; servisnega ključa `service_role` nikoli ne vstavimo v frontend.

## Vsebina in pravice

Besedilo je na novo napisano v slovenščini za izobraževalni prototip. Knjiga Robin Gerber, *Barbie: Her Inspiration, History, and Legacy*, je uporabljena kot raziskovalni vir. Za javno objavo je treba pri vsaki uporabljeni fotografiji preveriti dovoljenje ali licenco.

Spletna stran je neodvisen družinski izobraževalni projekt in ni uradna stran Mattel ali Barbie.
