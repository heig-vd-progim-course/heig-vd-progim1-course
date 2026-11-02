-- Filtre Pandoc : une question ne se coupe jamais entre deux pages.
--
-- Une question commence par un titre de niveau 3 et se termine par sa liste de
-- cases à cocher, suivie de l'éventuel bloc "Corrigé". L'ensemble est placé dans
-- une minipage, que LaTeX ne coupe pas. Une consigne suivie d'un bloc de code
-- ("Les questions 19 à 21 portent sur...") est traitée de la même façon.

local function wrap(blocks)
	local result = { pandoc.RawBlock("latex", "\\par\\noindent\\begin{minipage}{\\linewidth}") }
	for _, block in ipairs(blocks) do
		table.insert(result, block)
	end
	table.insert(result, pandoc.RawBlock("latex", "\\end{minipage}\\par\\medskip"))
	return result
end

function Pandoc(doc)
	local blocks = doc.blocks
	local output = {}
	local i = 1

	while i <= #blocks do
		local block = blocks[i]

		if block.t == "Header" and block.level == 3 then
			local question = { block }
			i = i + 1
			while i <= #blocks and blocks[i].t ~= "Header" do
				table.insert(question, blocks[i])
				i = i + 1
				if question[#question].t == "BulletList" then
					if i <= #blocks and blocks[i].t == "BlockQuote" then
						table.insert(question, blocks[i])
						i = i + 1
					end
					break
				end
			end
			for _, b in ipairs(wrap(question)) do
				table.insert(output, b)
			end
		elseif block.t == "Para" and i < #blocks and blocks[i + 1].t == "CodeBlock" then
			for _, b in ipairs(wrap({ block, blocks[i + 1] })) do
				table.insert(output, b)
			end
			i = i + 2
		else
			table.insert(output, block)
			i = i + 1
		end
	end

	doc.blocks = output
	return doc
end
